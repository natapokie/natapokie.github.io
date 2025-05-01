'use client'
import { NavbarItems } from '@/lib/static/intro';
import { INavbarContext, INavbarItem } from '@/lib/types/types';
import { createContext, useContext, useState } from 'react';

const NavbarContext = createContext<INavbarContext | undefined>(undefined);

export function NavbarProvider({ children }: { children: React.ReactNode }) {
    const [navbarState, setNavbarState] = useState<INavbarItem>(NavbarItems[0]);

    return (
        <NavbarContext.Provider value={{ navbarState, setNavbarState }}>
            {children}
        </NavbarContext.Provider>
    )
}

export function useNavbarContext() {
    const context = useContext(NavbarContext);
    if (!context) {
        throw new Error('useNavbarContext must be used within a NavbarProvider');
    }
    return context;
}
