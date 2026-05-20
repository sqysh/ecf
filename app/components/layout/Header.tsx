import Link from 'next/link'
import LogoHorizontalDark from '@/public/svg/LogoHorizontalDark'
import RightArrow from '@/public/svg/RightArrow'
import { Menu } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Picture from '../ui/media/Picture'
import Dropdown from '../ui/overlays/Dropdown'
import { store } from '@/app/lib/store/store'
import { setOpenContactDrawer } from '@/app/lib/store/slices/uiSlice'

const Header = () => {
  const pathname = usePathname()

  const headerNavLinks = [
    { textKey: 'Home', linkKey: '/', isActive: pathname === '/' },
    {
      textKey: 'Who We Are',
      linkKey: '/who-we-are',
      isActive: pathname.startsWith('/who-we-are'),
      dropdown: [
        { label: 'About ECF', linkKey: '/who-we-are/about', isActive: pathname === '/who-we-are/about' },
        {
          label: 'Executive Advocacy Committee',
          linkKey: '/who-we-are/committee',
          isActive: pathname === '/who-we-are/committee'
        },
        { label: 'History', linkKey: '/who-we-are/history', isActive: pathname === '/who-we-are/history' }
      ]
    },
    {
      textKey: 'Our Work',
      linkKey: '/our-work',
      isActive: pathname.startsWith('/our-work'),
      dropdown: [
        { label: 'Impact', linkKey: '/our-work/impact', isActive: pathname === '/our-work/impact' },
        { label: 'Math', linkKey: '/our-work/math', isActive: pathname === '/our-work/math' },
        { label: 'Success Stories', linkKey: '/our-work/success', isActive: pathname === '/our-work/success' },
        { label: 'Reading', linkKey: '/our-work/reading', isActive: pathname === '/our-work/reading' }
      ]
    },
    {
      textKey: 'Advocates',
      linkKey: '/advocates',
      isActive: pathname === '/advocates',
      dropdown: [
        { label: 'Partners', linkKey: '/advocates/partners', isActive: pathname === '/advocates/impact' },
        { label: 'Community', linkKey: '/advocates/community', isActive: pathname === '/advocates/community' }
      ]
    },
    { textKey: 'Contact', linkKey: '/contact', isActive: pathname === '/contact' },
    { textKey: 'Get Involved', linkKey: '/get-involved', isActive: pathname === '/get-involved' }
  ]

  return (
    <header className="bg-accent dark:bg-black sticky top-0 z-20 py-3 sm:py-4 md:py-5 px-3 sm:px-4 md:px-6 border-b border-b-border-light dark:border-b-border-dark xl:before:absolute xl:before:left-68 xl:before:top-0 xl:before:w-px xl:before:h-[102.31px] xl:before:content-[''] xl:before:bg-border-light xl:after:absolute xl:after:right-70 xl:after:top-0 xl:after:w-px xl:after:h-[102.31px] xl:after:content-[''] xl:after:bg-border-light xl:dark:before:absolute xl:dark:before:left-68 xl:dark:before:top-0 xl:dark:before:w-px xl:dark:before:h-[102.31px] xl:dark:before:content-[''] xl:dark:before:bg-border-dark xl:dark:after:absolute xl:dark:after:right-70 xl:dark:after:top-0 xl:dark:after:w-px xl:dark:after:h-[102.31px] xl:dark:after:content-[''] xl:dark:after:bg-border-dark">
      <div className="flex items-center justify-between gap-2 sm:gap-3 md:gap-4">
        <Link href="/">
          <div className="w-32 sm:w-40 md:w-48 lg:w-52">
            <Picture
              src="/svg/logo-horizontal-light.svg"
              alt="Education Comes First"
              className="dark:hidden block w-full h-full cursor-pointer hover:opacity-80 transition-opacity"
              priority={true}
            />
            <LogoHorizontalDark />
          </div>
        </Link>
        <nav className="hidden 1150:flex items-center gap-x-4 1150:gap-x-8">
          {headerNavLinks.map((obj, i) =>
            obj.dropdown ? (
              <Dropdown key={i} trigger={obj.textKey} items={obj.dropdown} isActive={obj.isActive} />
            ) : (
              <div
                key={i}
                className={`${obj.isActive ? 'text-secondary-light dark:text-secondary-dark' : 'text-text-light dark:text-text-dark'} font-mono uppercase text-xs sm:text-sm hover:text-secondary-light dark:hover:text-secondary-dark transition-colors duration-200`}
              >
                <Link href={obj.linkKey}>{obj.textKey}</Link>
              </div>
            )
          )}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          <Link
            href="/donate"
            className="hidden sm:inline-flex items-center gap-2 px-4 sm:px-6 md:px-8 h-9 sm:h-11 md:h-13 bg-primary-light dark:bg-primary-dark text-black font-mono text-sm font-medium hover:opacity-85 transition-opacity"
          >
            Donate
            <RightArrow />
          </Link>
          <button
            onClick={() => store.dispatch(setOpenContactDrawer())}
            className="flex items-center justify-center h-9 sm:h-11 md:h-13 aspect-square bg-bg-dark dark:bg-bg-light hover:opacity-80 transition-opacity shrink-0"
          >
            <Menu className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-text-dark dark:text-text-light" strokeWidth={1} />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
