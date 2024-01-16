import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import LinkButton from '@/app/ui/dashboard/link-button';
import { deleteCustomer } from '@/app/lib/customers/actions';

export function CreateCustomerButton() {
  return (
    <LinkButton
      href="/dashboard/customers/create"
      icon={<PlusIcon className="h-5 md:ml-4" />}
      text="Create Customer"
    />
  );
}

export function UpdateCustomerButton({ id }: { id: string }) {
  return (
    <LinkButton
      href={`/dashboard/customers/${id}/edit`}
      icon={<PencilIcon className="w-5" />}
      className="rounded-md border p-2 hover:bg-gray-100"
    />
  );
}

export function DeleteCustomerButton({ id }: { id: string }) {
  const deleteCustomerWithId = deleteCustomer.bind(null, id);
  return (
    <form action={deleteCustomerWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-4" />
      </button>
    </form>
  );
}
