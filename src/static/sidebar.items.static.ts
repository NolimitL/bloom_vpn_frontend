import { ISidebarItem } from '~/elements/sidebar/sidebar.item'
import { ReactComponent as IconNetwork } from '~/assets/icons/icon-network.svg'
import { ReactComponent as IconPayments } from '~/assets/icons/icon-dollar-symbol.svg'
import { ReactComponent as IconSubscriptions } from '~/assets/icons/icon-subscriptions.svg'
import { ReactComponent as IconSettings } from '~/assets/icons/icon-settings.svg'

export const SidebarItems: Array<ISidebarItem> = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: IconNetwork,
    type: 'i-link',
    linkTo: '/dashboard',
  },
  {
    id: 'subscriptions',
    label: 'Subscriptions',
    icon: IconSubscriptions,
    type: 'i-link',
    linkTo: '/subscriptions',
  },
  {
    id: 'payments',
    label: 'Payments',
    icon: IconPayments,
    type: 'i-link',
    linkTo: '/payments',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: IconSettings,
    type: 'i-link',
    linkTo: '/settings',
  },
]
