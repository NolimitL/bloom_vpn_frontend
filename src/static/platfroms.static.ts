import { ReactComponent as PlatformApple } from '/src/assets/platform-apple.svg'
import { ReactComponent as PlatformWindows } from '~/assets/platform-windows.svg'
import { ReactComponent as PlatformLinux } from '~/assets/platform-linux.svg'
import { ReactComponent as PlatformAndroid } from '~/assets/platform-android.svg'
import { ReactComponent as PlatformChrome } from '~/assets/platform-chrome.svg'
import { SvgComponent } from '~/common/types/defined.types'

export interface IPlatform {
  title: string
  value: string
  img: SvgComponent
  link: string
}

export const PLATFORMS: IPlatform[] = [
  {
    title: 'MacOs',
    value: 'macos',
    img: PlatformApple,
    link: 'https://itunes.apple.com/us/app/outline-app/id1356178125',
  },
  {
    title: 'Windows',
    value: 'windows',
    img: PlatformWindows,
    link:
      'https://raw.githubusercontent.com/Jigsaw-Code/outline-releases/master/client/stable/Outline-Client.exe',
  },
  {
    title: 'Linux',
    value: 'linux',
    img: PlatformLinux,
    link:
      'https://raw.githubusercontent.com/Jigsaw-Code/outline-releases/master/client/stable/Outline-Client.AppImage',
  },
  {
    title: 'iOS',
    value: 'ios',
    img: PlatformApple,
    link: 'https://itunes.apple.com/us/app/outline-app/id1356177741',
  },
  {
    title: 'Android',
    value: 'android',
    img: PlatformAndroid,
    link: 'https://play.google.com/store/apps/details?id=org.outline.android.client',
  },
  {
    title: 'Chrome',
    value: 'chrome',
    img: PlatformChrome,
    link: 'https://play.google.com/store/apps/details?id=org.outline.android.client',
  },
]
