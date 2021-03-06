import { Box, Flex, SimpleGrid, Text, theme } from '@chakra-ui/react';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';

const options = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500],
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    type: 'datetime',
    axisBorder: {
      color: theme.colors.gray[600],
    },
    axisTicks: {
      color: theme.colors.gray[600],
    },
    categories: [
      '2022-03-02T00:00:00.000Z',
      '2022-03-03T00:00:00.000Z',
      '2022-03-04T00:00:00.000Z',
      '2022-03-05T00:00:00.000Z',
      '2022-03-06T00:00:00.000Z',
      '2022-03-07T00:00:00.000Z',
      '2022-03-08T00:00:00.000Z',
    ],
  },
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  }
};

const series = [
  { name: 'series1', data: [31, 120, 10, 28, 61, 18, 109] }
];

export default function Dashboard() {
  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex
        width="100%"
        mx="auto"
        my="6"
        px="6"
        maxWidth={1480}
      >
        <Sidebar />

        <SimpleGrid flex="1" alignItems="flex-start" gap="4" minChildWidth="320px">
          <Box
            p={["6", "8"]}
            pb="4"
            bg="gray.800"
            borderRadius={8}
          >
            <Text mb="4" fontSize="lg">Inscritos da semana</Text>

            <Chart options={options} series={series} type="area" height={160} />
          </Box>

          <Box
            p={["6", "8"]}
            bg="gray.800"
            borderRadius={8}
          >
            <Text mb="4" fontSize="lg">Taxa de abertura</Text>

            <Chart options={options} series={series} type="area" height={160} />
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}
