export const db = {
  host: 'localhost',
  port: 28015,
  db: 'expertsdb',
};

export const auth = {
  passwordSalt: 'Gq0twQYeoP6YWZY7iBc!NyhVavauPHB5Q6jPU$LMzCxw@SM&y$udLVnmF0qu!%XR',
  sessionSecret: 'RGP84d%XZ$tck7TPpQ^zn#7Q$i&duxS2K!8ZR!87!9vJ2yZe@ZFqSMIvdvv4EseS',
  jwtSecret: 'uaeldt!2D9iVrOv1KEH#KRuaiEdJty6rRXJij$FN&D$oYKITos14Utok6W0kt83@',
  github: {
    clientID: process.env.GITHUB_CLIENT_ID || 'e43b56d1024cd4cc415f',
    clientSecret: process.env.GITHUB_CLIENT_SECRET || '9f538c12086fa2e5a81dbf0cfaabbbaf6edf5359',
    callbackURL: process.env.GITHUB_CALLBACK_URL || 'http://localhost:8080/api/github/callback',
    scope: process.env.GITHUB_CALLBACK_URL || 'user:email',
  },
};
