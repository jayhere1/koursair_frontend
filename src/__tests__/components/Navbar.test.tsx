import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: vi.fn(),
    push: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => '/',
}));

vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => {
    const { fill, priority, ...rest } = props;
    return <img {...rest} />;
  },
}));

vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...rest }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

vi.mock('sonner', () => ({
  toast: { success: vi.fn(), error: vi.fn(), info: vi.fn() },
}));

vi.mock('@/lib/supabaseClient', () => ({
  supabase: {
    auth: {
      getSession: vi.fn().mockResolvedValue({ data: { session: null }, error: null }),
    },
  },
}));

import { useAuthStore } from '@/stores/authStore';
import { useUIStore } from '@/stores/uiStore';
import Navbar from '@/components/Navbar';

describe('Navbar', () => {
  beforeEach(() => {
    useAuthStore.setState({
      user: null,
      token: null,
      authInitialized: false,
      resetToken: null,
      detectedPhoneCode: null,
      isPhoneCodeLoading: true,
    });
    useUIStore.setState({
      showLoginModal: false,
      showSignupModal: false,
      showForgotPasswordModal: false,
      showOTPEmailModal: false,
      showCreateNewPasswordModal: false,
      sessionExpiredOpen: false,
      popupConfig: null,
    });
    vi.clearAllMocks();
  });

  it('renders login button when not authenticated, click triggers openLogin', () => {
    render(<Navbar />);
    // The user icon button should be present (for non-authenticated users)
    const buttons = screen.getAllByRole('button');
    // Find the user icon button (not the mobile menu toggle)
    const userButton = buttons.find(
      (btn) => !btn.getAttribute('aria-label')?.includes('menu')
    );
    expect(userButton).toBeTruthy();

    fireEvent.click(userButton!);
    expect(useUIStore.getState().showLoginModal).toBe(true);
  });

  it('shows user name/email when authenticated', () => {
    useAuthStore.setState({
      user: { id: '1', name: 'Test User', email: 'test@test.com' },
      token: 'tok',
    });
    render(<Navbar />);
    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('test@test.com')).toBeInTheDocument();
  });

  it('logout button clears auth state', () => {
    useAuthStore.setState({
      user: { id: '1', name: 'Test User', email: 'test@test.com' },
      token: 'tok',
    });
    localStorage.setItem('token', 'tok');
    render(<Navbar />);

    const logoutBtn = screen.getByText('Logout');
    fireEvent.click(logoutBtn);
    expect(useAuthStore.getState().user).toBeNull();
    expect(useAuthStore.getState().token).toBeNull();
  });

  it('navigation links render', () => {
    render(<Navbar />);
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Destinations')).toBeInTheDocument();
    expect(screen.getByText('Talk to Us')).toBeInTheDocument();
  });

  it('mobile menu toggle works', () => {
    render(<Navbar />);
    const toggle = screen.getByLabelText('Toggle menu');
    expect(toggle).toBeInTheDocument();

    // Before click, mobile menu shouldn't show its items (they're in a separate div)
    fireEvent.click(toggle);
    // After click, mobile menu should be visible
    // Check that mobile menu items exist in the expanded view
    const mobileAboutLinks = screen.getAllByText('About Us');
    expect(mobileAboutLinks.length).toBeGreaterThanOrEqual(2); // Desktop + mobile
  });
});
