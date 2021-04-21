import { Box, SimpleGrid, Text, theme } from '@chakra-ui/react';
import dynamic from 'next/dynamic';

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
      '2021-04-18T00:00:00.000Z',
      '2021-04-19T00:00:00.000Z',
      '2021-04-20T00:00:00.000Z',
      '2021-04-21T00:00:00.000Z',
      '2021-04-22T00:00:00.000Z',
      '2021-04-23T00:00:00.000Z',
      '2021-04-24T00:00:00.000Z',
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
  { name: 'series1', data: [40, 10, 8, 90, 60, 80, 85] }
]

const series3 = [
  { name: 'series1', data: [1, 0, 4, 8, 0, 5, 0] }
]

export function ChartComponent() {
  return (
    <SimpleGrid flex="1" gap="4" minChildWidth="320px" align="flex-start">

      <Box p={["6", "8"]} bg="gray.800" borderRadius={8} pb="4">
        <Text fontSize="lg" mb="4">Ticket médio</Text>
        <Chart options={options} series={series} type="area" height={160} />
      </Box>

      <Box p={["6", "8"]} bg="gray.800" borderRadius={8} pb="4">
        <Text fontSize="lg" mb="4">Pedidos por dia</Text>
        <Chart options={options} series={series2} type="area" height={160} />
      </Box>

      <Box p={["6", "8"]} bg="gray.800" borderRadius={8} pb="4">
        <Text fontSize="lg" mb="4">Suportes solicitados por mês</Text>
        <Chart options={options} series={series3} type="area" height={160} />
      </Box>
    </SimpleGrid>
  )

}