import { PageLayout } from '~/components/layouts/page/page.layout'
import { Logo } from '~/components/logo/Logo'
import { DownloadList } from '~/pages/download/download.list'
import { Label } from '~/components/text/Label'

export function DownloadPage(): JSX.Element {
  return (
    <PageLayout>
      <Logo />
      <Label>
        It's a beta version of platform
        <div className="under-title">You can use our VPN for a month for free</div>
      </Label>
      <DownloadList />
    </PageLayout>
  )
}
