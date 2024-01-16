import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import LinkButton from '../link-button';
import { deleteInvoice } from '@/app/lib/invoices/actions';

export function CreateInvoiceButton() {
  return (
    <LinkButton
      href="/dashboard/invoices/create"
      icon={<PlusIcon className="h-5 md:ml-4" />}
      text="Create Invoice"
    />
  );
}

export function UpdateInvoiceButton({ id }: { id: string }) {
  return (
    <LinkButton
      href={`/dashboard/invoices/${id}/edit`}
      icon={<PencilIcon className="w-5" />}
      className="rounded-md border p-2 hover:bg-gray-100"
    />
  );
}

export function DeleteInvoiceButton({ id }: { id: string }) {
  const deleteInvoiceWithId = deleteInvoice.bind(null, id);
  return (
    <form action={deleteInvoiceWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-4" />
      </button>
    </form>
  );
}
