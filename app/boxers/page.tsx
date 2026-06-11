import { redirect } from 'next/navigation';
import { getNarapromoUrl } from '@/services/home';

export default function BoxersRedirectPage() {
  redirect(getNarapromoUrl('/boxers'));
}
