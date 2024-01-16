import CustomerForm from '@/app/ui/dashboard/customers/form';
import Breadcrumbs from '@/app/ui/dashboard/breadcrumbs';
import { notFound } from 'next/navigation';
import { fetchCustomerById } from '@/app/lib/customers/data';

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const customer = await fetchCustomerById(id);

  if (!customer) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Customers', href: '/dashboard/customers' },
          {
            label: 'Edit Customer',
            href: `/dashboard/customers/${id}/edit`,
            active: true,
          },
        ]}
      />
      <CustomerForm customer={customer} />
    </main>
  );
}
