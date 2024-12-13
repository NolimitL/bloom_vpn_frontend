import { PageLayout } from '~/components/layouts/page/page.layout'
import { IntentionForm } from '~/pages/intention/intention.form'
import { Logo } from '~/components/logo/Logo'
import { ILoginData } from '~/pages/login/login.interface'
import { useNetwork } from '~/backbone/hooks/network.hook'
import { useNavigate } from 'react-router-dom'
import { Label } from '~/components/text/Label'
import { FormTitle } from '~/components/forms/FormTitle'
import { FormBlock } from '~/components/forms/FormBlock'

export function IntentionPage(): JSX.Element {
  const network = useNetwork()
  const navigator = useNavigate()

  async function onHandleSubmit(data: ILoginData): Promise<string | void> {
    try {
      const message = await network.saveIntention(data)
      if (message) {
        return message
      } else {
        navigator('/download-app?success=true')
        return
      }
    } catch (e) {
      return 'Something went wrong, we investigate it.'
    }
  }

  return (
    <PageLayout>
      <Logo />
      <Label>
        It's a beta version of platform
        <div className="under-title">You can use our VPN for a month for free</div>
      </Label>
      <FormBlock>
        <FormTitle>
          Write your email to receive access key <br />
          for your private VPN server
        </FormTitle>
        <IntentionForm onSubmit={onHandleSubmit} />
      </FormBlock>
    </PageLayout>
  )
}
