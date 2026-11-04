export function WhatsAppIcon({ size = 22 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2a10 10 0 0 0-8.7 14.9L2 22l5.3-1.3A10 10 0 1 0 12 2Zm5.6 14.1c-.2.7-1.3 1.3-1.8 1.3-.5.1-1 .1-1.7-.1a13 13 0 0 1-5.7-4.6c-.4-.6-1-1.5-1-2.9 0-1.3.7-2 1-2.3.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6-.3.3c-.1.1-.2.3 0 .5a9 9 0 0 0 3.8 3.2c.3.1.4.1.6-.1l.8-1c.2-.2.3-.2.6-.1l2 1c.2.1.3.2.4.3 0 .1 0 .5-.2 1.2Z"
      />
    </svg>
  );
}

export function Chevron({ dir = 'right', size = 20 }: { dir?: 'left' | 'right'; size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        d={dir === 'left' ? 'M15 4 7 12l8 8' : 'm9 4 8 8-8 8'}
      />
    </svg>
  );
}
