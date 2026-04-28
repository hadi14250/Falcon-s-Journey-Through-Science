/* Tiny layout primitive — fixed-height vertical space. Use when a
   parent's flex/gap doesn't fit and you need a one-off gutter. */
export default function Spacer({ size = 16 }: { size?: number }) {
  return <div aria-hidden="true" style={{ height: size }} />;
}
