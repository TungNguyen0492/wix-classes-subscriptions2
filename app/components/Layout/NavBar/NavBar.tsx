'use client';
import { useCallback, useState } from 'react';
import type { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import Login from '@app/components/Login/Login';
import { StyledNavLink } from '@app/components/Layout/NavBar/NavLink';

const navbarItems = [
  { scroll: true, ref: '/', label: 'Home' },
  { scroll: false, ref: '/#about', label: 'Timeline' },
  { scroll: false, ref: '/#studio', label: 'Letter to u' },
  { scroll: true, ref: '/', label: 'Flower' },
];

export function NavBar() {
  const [isMenuShown, setIsMenuShown] = useState(false);
  const pathname = usePathname();
  const [linkRef, setLinkRef] = useState<LinkProps['href']>(pathname!);
  const toggleOpen = useCallback(
    () => setIsMenuShown(!isMenuShown),
    [isMenuShown]
  );
  return (
    <>
      <button
        className="block md:hidden absolute right-8 top-6 z-50"
        onClick={toggleOpen}
      >
        <div className="space-y-2.5">
          {(isMenuShown
            ? [
                'rotate-45 translate-y-[14.5px]',
                'opacity-0 h-0',
                '-rotate-45 translate-y-[-14.5px]',
              ]
            : ['', '', '']
          ).map((className, index) => (
            <span
              key={index}
              className={
                'block h-[3px] w-8 bg-highlight rounded transform transition duration-500 ease-in-out ' +
                className
              }
            ></span>
          ))}
        </div>
      </button>
      <nav
        className={`${
          isMenuShown ? 'max-md:w-full' : 'max-md:w-0 max-md:opacity-0'
        } w-full transition-all duration-500 ease-in-out md:block overflow-hidden max-md:absolute max-md:animate-sideways-once max-md:h-screen max-md:bg-teal-400 max-md:pt-24 z-40 top-0 right-0`}
      >
        <ul className="flex flex-col justify-center md:flex-row gap-10 md:gap-4 min-[900px]:gap-5 lg:gap-8 start text-md leading-[22px] items-center">
          {navbarItems.map(({ ref, label, scroll, prefetch }) => (
            <li key={ref} className="relative">
              <StyledNavLink
                isActive={ref === linkRef}
                href={ref}
                onClick={() => {
                  setLinkRef(ref);
                  setIsMenuShown(false);
                }}
                scroll={scroll}
                prefetch={prefetch}
              >
                {label}
              </StyledNavLink>
              <span className="absolute -bottom-5 md:hidden w-48 left-[calc(50%_-_theme(space.24))] border" />
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
