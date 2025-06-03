# Pyros AI App (ChatGPT/Gemini Clone)

- ⚛️ **Tehnologije**: React.js, Node.js, Express, MongoDB
- 🧠 **Integracija sa Google Gemini AI** za generisanje odgovora i vođenje konverzacije u realnom vremenu
- ⚡ **React Query** za dohvat podataka, keširanje i optimizaciju
- 💬 **Chat interfejs** sa prikazom poruka korisnika i AI-a
- 📜 **Istorija konverzacija** – čuvanje prethodnih sesija i pregled
- ⚙️ **Podešavanja korisničkog naloga** – promene imena, slike, brisanje naloga

### Client .env setup

```bash
VITE_CLERK_PUBLISHABLE_KEY=...

VITE_IMAGE_KIT_ENDPOINT=...
VITE_IMAGE_KIT_PUBLIC_KEY=...

VITE_GEMINI_PUBLIC_KEY=...
VITE_API_URL=http://localhost:3000
```

### Backend .env setup

```bash
IMAGE_KIT_ENDPOINT=...
IMAGE_KIT_PUBLIC_KEY=...
IMAGE_KIT_PRIVATE_KEY=...

CLIENT_URL=http://localhost:5173
MONGO=...

CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...
```

### Pokretanje aplikacije lokalno (development mode)

- U backend folderu

```shell
npm start
```

- U client folderu

```shell
npm run dev
```

### Homepage

![Homepage](./client/public/project-media/0.%20homepage.png)

### Login and signup

![Login and Signup](./client/public/project-media/1.%20login%20and%20signup.png)

### Chat Page

![Chat Page](./client/public/project-media/2.%20chat%20page.png)

### Chatting

![Chatting](./client/public/project-media/3.%20chatting.png)

### Coding

![Coding](./client/public/project-media/4.%20coding.png)

### Image

![Image](./client/public/project-media/5.%20image.png)

