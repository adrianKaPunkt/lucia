'use client';

import gsap from 'gsap';
import { sidebarLinks } from './sidebar-data';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { TiChevronLeft } from 'react-icons/ti';
import { TiChevronRight } from 'react-icons/ti';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const onMouseEnterHandler = () => {
    gsap.to('#sidebar', { x: 210 });
    setIsSidebarOpen(true);
  };

  const onMouseLeaveHandler = () => {
    gsap.to('#sidebar', { x: 0 });
    setIsSidebarOpen(false);
  };

  return (
    <div
      className="flex absolute left-[-210px] z-50 w-[250px]"
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
      id="sidebar">
      <div className="p-4 flex relative w-[230px] h-[calc(100vh-64px)] overflow-hidden bg-slate-300 dark:bg-slate-700">
        <div className="flex w-[210px]">
          <div className="mt-5">
            {sidebarLinks.map((item) => (
              <div key={item.id} className="mb-10">
                <span className="pb-10 text-gray-500">{item.title}</span>
                {item.listItems.map((listItem) => (
                  <Link
                    href={listItem.url}
                    key={listItem.id}
                    className="flex items-center p-4 gap-5 rounded-md hover:bg-slate-200 dark:hover:bg-slate-600">
                    <Image
                      src={listItem.icon}
                      alt={listItem.title}
                      width={20}
                      height={20}
                      className="invert dark:invert-0"
                    />
                    <span>{listItem.title}</span>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="h-[calc(100vh-64px)] flex items-center">
        <div className="flex w-[40px] h-16 bg-slate-300 dark:bg-slate-700 rounded-r-xl items-center justify-center">
          {isSidebarOpen ? <TiChevronLeft /> : <TiChevronRight />}
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
