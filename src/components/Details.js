import React from "react";
import { Descriptions } from "antd";

const Details = (props) => (
  <div>
    <Descriptions
      title="Hasil Perhitungan"
      bordered
      column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
    >
      <Descriptions.Item label="Total Wh">
        {props.result.total || 0} Wh = {props.result.kwh || 0} kWh
      </Descriptions.Item>
      <Descriptions.Item label="Total kWh perhari">
        {props.result.dailyKwh || 0} kWh
      </Descriptions.Item>
      <Descriptions.Item label="Total kWh perbulan">
        {props.result.monthlyKwh || 0} kWh
      </Descriptions.Item>
      <Descriptions.Item label="Total kWh pertahun">
        {props.result.yearlyKwh || 0} kWh
      </Descriptions.Item>
      <Descriptions.Item label="Tarif listrik per-Kwh">
        {props.result.rates || 0}
      </Descriptions.Item>
      <Descriptions.Item label="Total biaya listrik per-hari">
        {props.result.dailyRate || 0}
      </Descriptions.Item>
      <Descriptions.Item label="Total biaya listrik per-bulan">
        {props.result.monthlyRate || 0}
      </Descriptions.Item>
      <Descriptions.Item label="Total biaya listrik per-tahun">
        {props.result.yearlyRate || 0}
      </Descriptions.Item>
    </Descriptions>
  </div>
);

export default Details;
