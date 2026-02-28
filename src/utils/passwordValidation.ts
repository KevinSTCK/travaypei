/**
 * Validation du mot de passe pour les candidats.
 * Exigences : 8+ caractères, majuscule, minuscule, chiffre, caractère spécial.
 */

export type PasswordRequirement = {
  id: string
  label: string
  met: boolean
}

export function validatePassword(password: string): PasswordRequirement[] {
  return [
    {
      id: 'length',
      label: 'Au moins 8 caractères',
      met: password.length >= 8,
    },
    {
      id: 'uppercase',
      label: 'Une majuscule',
      met: /[A-Z]/.test(password),
    },
    {
      id: 'lowercase',
      label: 'Une minuscule',
      met: /[a-z]/.test(password),
    },
    {
      id: 'number',
      label: 'Un chiffre',
      met: /\d/.test(password),
    },
    {
      id: 'special',
      label: 'Un caractère spécial (!@#$%^&*...)',
      met: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
    },
  ]
}

export function isPasswordSecure(password: string): boolean {
  return validatePassword(password).every((r) => r.met)
}
