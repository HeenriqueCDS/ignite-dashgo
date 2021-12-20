import { Button, ButtonProps as ChakraButtonProps } from "@chakra-ui/react";

interface PaginationItemProps extends ChakraButtonProps {
    number: number;
    isCurrent?: boolean;
}

export function PaginationItem({ isCurrent = false, number, ...rest }: PaginationItemProps) {
    if (isCurrent) {
        return (
            <Button
                size='sm'
                fontSize='xs'
                width='4'
                colorScheme='pink'
                disabled
                _disabled={{
                    bg: 'pink.500',
                    cursor: 'default',
                }}
                {...rest}
            >
                {number}
            </Button>
        );
    }
    return (
        <Button
        size='sm'
        fontSize='xs'
        width='4'
        bg='gray.700'
        _hover={{
            bg: 'gray.500'
        }}
        {...rest}
    >
        {number}
    </Button>
    );
}