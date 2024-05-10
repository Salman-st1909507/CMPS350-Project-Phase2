import React from "react";
import styles from "@/app/statistics.module.css";
import StatisticsRepo from "@/app/repo/statistics-repo";

export default async function StatisticsPage() {
  const customersPerLocation = await StatisticsRepo.getCustomersPerLocation();
  const mostPurchasedProductsThisMonth =
    await StatisticsRepo.getMostPurchasedProductsThisMonth();
  const outOfStockItems = await StatisticsRepo.getOutOfStockItems();
  const uploadedItemsThisMonth =
    await StatisticsRepo.getUploadedItemsThisMonth();
  const totalBoughtItemsQuantity =
    await StatisticsRepo.getTotalBoughtItemsQuantity();
  const sellersCount = await StatisticsRepo.getSellersCount();
  const customersCount = await StatisticsRepo.getCustomersCount();
  const totalUploadedItemsCount =
    await StatisticsRepo.getTotalUploadedItemsCount();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Statistics Page</h1>

      <div className={styles.singleValueContainer}>
        <div className={styles.singleValue}>
          <h2>
            Total Bought Items Quantity:{" "}
            {totalBoughtItemsQuantity._sum.quantity}
          </h2>
        </div>
        <div className={styles.singleValue}>
          <h2>Total Sellers Count: {sellersCount}</h2>
        </div>
        <div className={styles.singleValue}>
          <h2>Total Customers Count: {customersCount}</h2>
        </div>
        <div className={styles.singleValue}>
          <h2>Total Uploaded Items Count: {totalUploadedItemsCount}</h2>
        </div>
      </div>

      <h2>Customers per Location</h2>
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr>
            <th>Location</th>
            <th>Number of Customers</th>
          </tr>
        </thead>
        <tbody>
          {customersPerLocation.map((data, index) => (
            <tr key={index} className={styles.tableRow}>
              <td>{data.shippingAddress}</td>
              <td>{data._count}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Most Purchased Products this Month</h2>
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr>
            <th>Product ID</th>
            <th>Total Quantity</th>
          </tr>
        </thead>
        <tbody>
          {mostPurchasedProductsThisMonth.map((data, index) => (
            <tr key={index} className={styles.tableRow}>
              <td>{data.itemId}</td>
              <td>{data._sum.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Out of Stock Items</h2>
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr>
            <th>Product ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {outOfStockItems.map((item, index) => (
            <tr key={index} className={styles.tableRow}>
              <td>{item.itemId}</td>
              <td>{item.name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Uploaded Items this Month</h2>
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr>
            <th>Product ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {uploadedItemsThisMonth.map((item, index) => (
            <tr key={index} className={styles.tableRow}>
              <td>{item.itemId}</td>
              <td>{item.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
