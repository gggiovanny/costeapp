import { Container, Grid, Stack, Table, Text, TextInput } from '@mantine/core';
import { MdAssignment, MdAttachMoney } from 'react-icons/md';

import moneyFormatter from '~/utils/moneyFormatter';

const { Col } = Grid;

const costNameKey = 'costName';
const montlyCostKey = 'montlyCost';

const mockData = [
  { costName: 'Luz', montlyCost: 500 },
  { costName: 'Agua', montlyCost: 200 },
  { costName: 'Sueldos', montlyCost: 2000 },
  { costName: 'Gas', montlyCost: 1000 },
];

export default function CostosFijos() {
  return (
    <Container>
      <Grid>
        <Col md={6}>
          <Stack>
            <TextInput
              name={costNameKey}
              label="Concepto"
              placeholder="Concepto"
              icon={<MdAssignment />}
            />
            <TextInput
              name={montlyCostKey}
              label="Costo mensual"
              placeholder="Costo mensual"
              icon={<MdAttachMoney />}
            />
          </Stack>
        </Col>
        <Col md={6}>
          <Text size="xl">Costos Fijos</Text>
          <Table>
            <thead>
              <tr>
                <th>Concepto</th>
                <th>Costo mensual</th>
              </tr>
            </thead>
            <tbody>
              {mockData.map(({ costName, montlyCost }, index) => {
                return (
                  <tr key={index}>
                    <td>{costName}</td>
                    <td>{moneyFormatter.format(montlyCost)}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
      </Grid>
    </Container>
  );
}
