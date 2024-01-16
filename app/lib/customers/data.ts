import { sql } from '@vercel/postgres';
import { Customer, CustomerField, CustomersTableType } from '../definitions';
import { unstable_noStore as noStore } from 'next/cache';
import { formatCurrency } from '../utils';

const ITEMS_PER_PAGE = 6;

export async function fetchCustomers() {
  noStore();

  try {
    const data = await sql<CustomerField>`
        SELECT
          id,
          name
        FROM customers
        ORDER BY name ASC
      `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string, currentPage: number) {
  noStore();

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const data = await sql<CustomersTableType>`
          SELECT
            customers.id,
            customers.name,
            customers.email,
            customers.image_url,
            COUNT(invoices.id) AS total_invoices,
            SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
            SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
          FROM customers
          LEFT JOIN invoices ON customers.id = invoices.customer_id
          WHERE
            customers.name ILIKE ${`%${query}%`} OR
          customers.email ILIKE ${`%${query}%`}
          GROUP BY customers.id, customers.name, customers.email, customers.image_url
          ORDER BY customers.name ASC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
        `;

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

export async function fetchCustomersPages(query: string) {
  noStore();

  try {
    const count = await sql`SELECT COUNT(*)
      FROM customers
          WHERE
            customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
    `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of customers.');
  }
}

export async function fetchCustomerById(id: string) {
  noStore();

  try {
    const customer = await sql<Customer>`
        SELECT
          customers.id,
          customers.name,
          customers.email,
          customers.image_url
        FROM customers
        WHERE customers.id = ${id};
      `;

    return customer.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch customer.');
  }
}