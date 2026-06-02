import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex-1 flex items-center justify-center py-20" style={{ background: 'var(--color-bg)' }}>
      <SignUp appearance={{
        elements: {
          formButtonPrimary: 'bg-[#C4A98C] hover:bg-[#A68A77] text-white',
          card: 'shadow-lg rounded-2xl',
        }
      }} />
    </div>
  );
}
