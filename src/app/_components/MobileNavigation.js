'use client'

import {
    Button,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    useDisclosure
} from "@heroui/react";
import { ChartNoAxesGantt, Languages, LogIn } from "lucide-react";
import Link from "next/link";
import { navLinks } from "../_utils/static";
import { Button as MyButton } from "./Button";
import ButtonLink from "./ButtonLink";

function MobileNavigation() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const links = navLinks;

    return (
        <div>
            <Button isIconOnly aria-label="Like" size="md" radius="full" color="primary" onPress={onOpen}>
                <ChartNoAxesGantt />
            </Button>

            <Drawer isOpen={isOpen} onOpenChange={onOpenChange} size="xs" radius="none">
                <DrawerContent>
                    {() => (
                        <>
                            <DrawerHeader className="flex flex-col gap-1 text-2xl font-bold">Menu</DrawerHeader>
                            <DrawerBody>
                                <nav className="flex flex-col gap-4">
                                    {links.map((link) => (
                                        <Link key={link.href} href={link.href}
                                            onClick={onOpenChange}
                                            className="mx-4 text-text text-2xl hover:underline underline-offset-4 un">
                                            {link.label}
                                        </Link>
                                    ))}
                                </nav>

                                <ButtonLink href="/login" className="btn btn-primary btn-md mt-8 w-full flex items-center justify-center gap-2">
                                    <LogIn className="h-5 w-5" />
                                    Login
                                </ButtonLink>

                                <MyButton variant="ghost"><Languages /></MyButton>
                            </DrawerBody>
                        </>
                    )}
                </DrawerContent>
            </Drawer>
        </div>
    )
}

export default MobileNavigation
