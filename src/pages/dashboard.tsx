import { Flex, SimpleGrid, Box, Text, theme } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { Header } from "../components/Header";
import { Sidebar } from '../components/Sidebar';

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false
})

const options = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500]
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
    axisborder: {
      color: theme.colors.gray[600]
    },
    axiosTicks: {
      color: theme.colors.gray[600]
    },
    categories: [
      '2021-01-01T00:00:00.000Z',
      '2021-02-01T00:00:00.000Z',
      '2021-03-01T00:00:00.000Z',
      '2021-04-01T00:00:00.000Z',
      '2021-05-01T00:00:00.000Z',
      '2021-06-01T00:00:00.000Z',
      '2021-07-01T00:00:00.000Z',
    ]
  },
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityFrom: 0.7,
      opacityTo: 0.3,
    }
  }
};

const series = [
  { name: 'series1', data: [15000, 12000, 3000, 28000, 10000, 50000, 10000] }
]

const series2 = [
  { name: 'series1', data: [5, 1, 8, 10, 12, 3, 15] }
]

export default function Dashboard() {
  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <SimpleGrid flex="1" gap="4" minChildWidth="320px" align="flex-start">

          <Box p={["6", "8"]} bg="gray.800" borderRadius={8} pb="4">
            <Text fontSize="lg" mb="4">Ticket médio</Text>
            <Chart options={options} series={series} type="area" height={160} />
          </Box>

          <Box p={["6", "8"]} bg="gray.800" borderRadius={8} pb="4">
            <Text fontSize="lg" mb="4">Taxa de abertura</Text>
            <Chart options={options} series={series2} type="area" height={160} />
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  )
}
