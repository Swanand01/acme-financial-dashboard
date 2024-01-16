import CustomerForm from '@/app/ui/dashboard/customers/form';
import Breadcrumbs from '@/app/ui/dashboard/breadcrumbs';

export default function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Customers', href: '/dashboard/customers' },
          {
            label: 'Create Customer',
            href: '/dashboard/customers/create',
            active: true,
          },
        ]}
      />
      <CustomerForm />
    </main>
  );
}
