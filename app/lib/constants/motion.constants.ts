// slide in from right (drawer)
export const slideInRight = {
  closed: {
    x: '100%',
    transition: { type: 'spring' as const, stiffness: 400, damping: 40 }
  },
  open: {
    x: 0,
    transition: { type: 'spring' as const, stiffness: 400, damping: 40 }
  }
}

// fade overlay
export const fadeOverlay = {
  closed: { opacity: 0, transition: { duration: 0.3 } },
  open: { opacity: 1, transition: { duration: 0.3 } }
}

// fade + move up (your most reused one)
export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, easing: [0.22, 1, 0.36, 1] }
  }
}

// fade + scale (the "pop")
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, easing: [0.22, 1, 0.36, 1] }
  }
}

// parent container with stagger
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
}

// lightweight stagger only
export const staggerChildren = {
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1
    }
  }
}

export const fadeUpItem = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      easing: [0.22, 1, 0.36, 1]
    }
  }
}

export const rowVariants = (index: number) => ({
  initial: { opacity: 0, x: -14 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { delay: index * 0.07, duration: 0.35, easing: [0.22, 1, 0.36, 1] }
  }
})

export const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2, easing: 'easeOut' } },
  exit: { opacity: 0, transition: { duration: 0.18, easing: 'easeIn' } }
}

export const panelVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.32, easing: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: 12, scale: 0.98, transition: { duration: 0.2, easing: 'easeIn' } }
}

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
}

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, easing: 'easeOut' }
  }
}

/**
 * =========================
 * MOTION VARIANTS REFACTOR
 * =========================
 *
 * RENAMED / CONSOLIDATED:
 *
 * containerVariants      → staggerContainer (or removed duplicate version)
 * itemVariants           → fadeUpItem
 * cardVariants (y move)  → fadeUpItem (same behavior, reused)
 * cardVariants (scale)   → scaleIn
 *
 * rowVariants(index)     → slideInLeftStaggered (index-based animation)
 *
 * stagger                → REMOVED (duplicate of staggerChildren logic)
 * staggerContainer       → KEPT (single source of truth for parent stagger)
 *
 * fadeUp                 → KEPT (generic reusable fade + y animation)
 *
 *
 * NOTES:
 * - Prefer "motion-based naming" over UI-based naming (e.g. fadeUp vs itemVariants)
 * - Avoid duplicate container/item variants (use staggerContainer + fadeUpItem)
 * - Keep index-based animations as functions (e.g. slideInLeftStaggered)
 */
