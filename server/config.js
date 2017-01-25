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
    clientID: process.env.GITHUB_CLIENT_ID || '0fe29a5dc637d03bac23',
    clientSecret: process.env.GITHUB_CLIENT_SECRET || '6ab8236d13352bd767c6a691c51701b9019ca1d7',
    callbackURL: process.env.GITHUB_CALLBACK_URL || 'http://localhost:8080/api/github/callback',
    scope: process.env.GITHUB_CALLBACK_URL || 'user:email',
  },
};
