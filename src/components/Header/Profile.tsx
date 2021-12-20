import { Flex, Box, Avatar, Text } from "@chakra-ui/react";

interface ProfileProps {
    showProfileData: boolean;
}

export function Profile({ showProfileData }: ProfileProps) {
    return (
        <Flex align='center'>
            {showProfileData && (
                <Box mr='4' textAlign='right' >
                    <Text>Henrique de Carvalho</Text>
                    <Text color='gray.300' fontSize='small'>henriquecds.business@gmail.com</Text>
                </Box>
            )}


            <Avatar size='md' name='Henrique Carvalho' src='https://github.com/heenriquecds.png' />
        </Flex>
    );
}