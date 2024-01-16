import InvoiceForm from '@/app/ui/dashboard/invoices/form';
import Breadcrumbs from '@/app/ui/dashboard/breadcrumbs';
import { fetchCustomers } from '@/app/lib/customers/data';

export default async function Page() {
  const customers = await fetchCustomers();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Create Invoice',
            href: '/dashboard/invoices/create',
            active: true,
          },
        ]}
      />
      <InvoiceForm customers={customers} />
    </main>
  );
}
