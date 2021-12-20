import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { cloneElement, ReactElement } from "react";

interface ActiveLinkProps extends LinkProps {
    children: ReactElement;
    shouldMatchExactHref?: boolean
}

export function ActiveLink({ children,
    shouldMatchExactHref = false,
    ...rest
}: ActiveLinkProps) {
    const { asPath } = useRouter()
    let isActive = false
    if (shouldMatchExactHref) {
        isActive = asPath === rest.href
    }
    if (!shouldMatchExactHref) {
        isActive = asPath.startsWith(String(rest.href));
    }
    return (
        <Link {...rest}>
            {cloneElement(children, {
                color: isActive ? 'pink.400' : 'gray.50'
            })}
        </Link>
    );
}