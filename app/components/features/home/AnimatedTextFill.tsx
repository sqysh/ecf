const AnimatedTextFillStyles = `
        @keyframes fillRetract {
          0% { background-size: 0% 100%; }
          33% { background-size: 100% 100%; }
          66% { background-size: 100% 100%; }
          100% { background-size: 0% 100%; }
        }
        
        .fill-animate {
          font-size: clamp(1.5rem, 8vw, 8rem);
          font-weight: 900;
          letter-spacing: -0.02em;
          line-height: 1.2;
          -webkit-text-stroke: clamp(1px, 0.15vw, 2px) rgba(255, 255, 255, 0.5);
          paint-order: stroke fill;
          background: linear-gradient(90deg, var(--color-gradient) 0%, var(--color-gradient) 100%);
          background-size: 0% 100%;
          background-position: left center;
          background-repeat: no-repeat;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: fillRetract 5s ease-in-out infinite;
        }

        @media (prefers-color-scheme: dark) {
          .fill-animate {
            -webkit-text-stroke: clamp(1px, 0.15vw, 2px) rgba(255, 255, 255, 0.6);
          }
        }

        @media (prefers-color-scheme: light) {
          .fill-animate {
            -webkit-text-stroke: clamp(1px, 0.15vw, 2px) rgba(255, 255, 255, 0.8);
            --color-gradient: var(--color-primary-light);
            color: white;
          }
        }
      `

export default function AnimatedTextFill() {
  return (
    <>
      <style>{AnimatedTextFillStyles}</style>
      <span className="fill-animate">Education</span>
    </>
  )
}
