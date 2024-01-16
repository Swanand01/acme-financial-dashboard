'use server';

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type CustomerState = {
  name?: string;
  email?: string;
  imageURL?: string;
  errors?: {
    name?: string[];
    email?: string[];
    imageURL?: string[];
  };
  message?: string | null;
};

const CustomerFormSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  imageURL: z.string().url(),
});

const CreateCustomer = CustomerFormSchema.omit({ id: true });

export async function createCustomer(prevState: CustomerState, formData: FormData) {
  const validatedFields = CreateCustomer.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    imageURL: formData.get('imageURL'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create User.',
    };
  }

  const { name, email, imageURL } = validatedFields.data;

  try {
    await sql`
      INSERT INTO customers (name, email, image_url)
      VALUES (${name}, ${email}, ${imageURL})
      ON CONFLICT (id) DO NOTHING;
      `;
  } catch (error) {
    return {
      message: 'Failed to Create User.',
    };
  }

  revalidatePath('/dashboard/customers/');
  redirect('/dashboard/customers/');
}

const UpdateCustomer = CustomerFormSchema.omit({ id: true });

export async function updateCustomer(
  id: string,
  prevState: CustomerState,
  formData: FormData,
) {
  const validatedFields = UpdateCustomer.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    imageURL: formData.get('imageURL'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create User.',
    };
  }

  const { name, email, imageURL } = validatedFields.data;

  try {
    await sql`
      UPDATE customers
      SET name = ${name}, email = ${email}, image_url = ${imageURL}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Customer.' };
  }

  revalidatePath('/dashboard/customers/');
  redirect('/dashboard/customers/');
}

export async function deleteCustomer(id: string) {
  try {
    await sql`DELETE FROM customers WHERE id = ${id}`;
    revalidatePath('/dashboard/customers');
    return { message: 'Deleted Customer.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Customer.' };
  }
}