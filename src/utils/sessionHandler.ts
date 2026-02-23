
type OpenAuthModalFn = (options: {
  reason: "session_expired";
}) => void;

let modalOpen = false;

export function handleSessionExpired(
  openAuthModal: OpenAuthModalFn
): void {
  if (modalOpen) return;

  modalOpen = true;
  localStorage.clear();
  openAuthModal({ reason: "session_expired" });
}
