import React from 'react'

import {Link, Outlet} from 'react-router-dom';
import { Navbar } from 'flowbite-react';

import { Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from 'react-icons/hi';

import { Accordion } from 'flowbite-react';

const ClientLayout = () => {
  return (
        <>
            <header>
            <Navbar fluid rounded>
          <Navbar.Brand as={Link} href="https://flowbite-react.com">
            <img src="./src/components/images/l1.jpg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite React</span>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Navbar.Link href="#" active>
              Home
            </Navbar.Link>
            <Navbar.Link as={Link} href="#">
              About
            </Navbar.Link>
            <Navbar.Link href="#">Services</Navbar.Link>
            <Navbar.Link href="#">Pricing</Navbar.Link>
            <Navbar.Link href="#">Contact</Navbar.Link>
          </Navbar.Collapse>
        </Navbar>
            </header>
    
            <div className='flex'>
            <aside>
            <Sidebar aria-label="Sidebar with logo branding example">
          <Sidebar.Logo href="#" img="./src/components/images/l1.jpg" imgAlt="Flowbite logo">
            Flowbite
          </Sidebar.Logo>
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item href="#" icon={HiChartPie}>
                Dashboard
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={HiViewBoards}>
                Kanban
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={HiInbox}>
                Inbox
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={HiUser}>
                Users
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={HiShoppingBag}>
                Products
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={HiArrowSmRight}>
                Sign In
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={HiTable}>
                Sign Up
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
            </aside>
    
            <main className='w-full'>
                <section className='px-4 pt-2 pb-6'>
                    <Outlet />
                </section>
            </main>
            </div>
    
            
        </>
        )
}

export default ClientLayout