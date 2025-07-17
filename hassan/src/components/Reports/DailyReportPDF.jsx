import React  , { useState}from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import api from '../../services/api.js';

  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [report, setReport] = useState(null);

    const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const generateReport = async () => {
    try {
      const response = await api.get(`/reports/daily?date=${date}`);
      setReport(response.data);
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };


const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    width: "14%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
  },
  tableHeader: {
    backgroundColor: "#f0f0f0",
    fontWeight: "bold",
  },
});

const DailyReportPDF = ({ report }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text>Rapport Journalier - {report.reportDate}</Text>
      </View>
      
      <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>Ventes</Text>
      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={styles.tableCol}>ID</Text>
          <Text style={styles.tableCol}>Client</Text>
          <Text style={styles.tableCol}>Total</Text>
          <Text style={styles.tableCol}>Statut</Text>
        </View>
        {report.sales.map((sale) => (
          <View style={styles.tableRow} key={sale.id}>
            <Text style={styles.tableCol}>{sale.id}</Text>
            <Text style={styles.tableCol}>{sale.client_name || 'Non spécifié'}</Text>
            <Text style={styles.tableCol}>{sale.total_amount.toFixed(2)}</Text>
            <Text style={styles.tableCol}>{sale.status}</Text>
          </View>
        ))}
      </View>
      
      <Text style={{ marginTop: 20, marginBottom: 10, fontWeight: 'bold' }}>Mouvements de Stock</Text>
      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={styles.tableCol}>Produit</Text>
          <Text style={styles.tableCol}>Stock Initial</Text>
          <Text style={styles.tableCol}>Entrées</Text>
          <Text style={styles.tableCol}>Sorties</Text>
          <Text style={styles.tableCol}>Retours</Text>
          <Text style={styles.tableCol}>Stock Final</Text>
          <Text style={styles.tableCol}>Stock Actuel</Text>
        </View>
        {report.stockMovements.map((movement) => (
          <View style={styles.tableRow} key={movement.product_id}>
            <Text style={styles.tableCol}>{movement.product_name}</Text>
            <Text style={styles.tableCol}>{movement.initial_stock || 0}</Text>
            <Text style={styles.tableCol}>{movement.entry_quantity}</Text>
            <Text style={styles.tableCol}>{movement.sold_quantity}</Text>
            <Text style={styles.tableCol}>{movement.returned_quantity}</Text>
            <Text style={styles.tableCol}>
              {(movement.initial_stock || 0) + movement.entry_quantity - movement.sold_quantity + movement.returned_quantity}
            </Text>
            <Text style={styles.tableCol}>{movement.current_stock}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default DailyReportPDF;