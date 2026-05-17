# 🏗️ MAISON ISRAËL — Guide d'installation Supabase

## Étape 1 — Créer un projet Supabase (5 minutes)

1. Allez sur **https://supabase.com** → Créer un compte (gratuit)
2. Cliquez **"New Project"**
3. Remplissez :
   - Organisation : votre nom
   - Project name : `maison-israel`
   - Database password : choisissez un mot de passe fort (notez-le !)
   - Region : **EU West (Frankfurt)** (le plus proche d'Israël)
4. Attendez ~2 minutes que le projet se crée

---

## Étape 2 — Récupérer les clés API

1. Dans votre projet Supabase → **Settings** (⚙️) → **API**
2. Notez :
   - **Project URL** : `https://xxxxxxxx.supabase.co`
   - **anon/public key** : `eyJhbGci...` (clé longue)

---

## Étape 3 — Créer le schéma de base de données

1. Dans Supabase → **SQL Editor** → **New query**
2. Copiez-collez TOUT le contenu du fichier `supabase-schema.sql`
3. Cliquez **"Run"**

> ✅ Cela crée les tables: biens, articles, leads, profiles + le bucket images

---

## Étape 4 — Créer votre compte admin

1. Dans Supabase → **Authentication** → **Users** → **"Add user"** → **"Create new user"**
2. Email : votre email
3. Password : votre mot de passe (vous pourrez l'utiliser sur `/admin/login`)
4. Cochez **"Auto Confirm User"**

---

## Étape 5 — Configurer les variables d'environnement sur Vercel

Dans votre terminal :

```bash
cd /Users/reouvenbenchetrit/Downloads/maison-israel-next

# Ajoutez l'URL Supabase
vercel env add NEXT_PUBLIC_SUPABASE_URL
# → Entrez : https://VOTRE_PROJECT_ID.supabase.co
# → Environnements : Production, Preview, Development (sélectionnez tout)

# Ajoutez la clé anon
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
# → Entrez : votre anon key
# → Environnements : Production, Preview, Development (sélectionnez tout)
```

---

## Étape 6 — Redéployer

```bash
cd /Users/reouvenbenchetrit/Downloads/maison-israel-next
source ~/.nvm/nvm.sh
vercel --prod --yes
```

---

## Étape 7 — Mettre à jour .env.local (pour développement local)

Modifiez `/Users/reouvenbenchetrit/Downloads/maison-israel-next/.env.local` :

```
NEXT_PUBLIC_SUPABASE_URL=https://VOTRE_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_anon_key
```

---

## ✅ Vérification

- **Site** : https://maison-israel-next.vercel.app
- **Admin** : https://maison-israel-next.vercel.app/admin/login
- **Login** : votre email Supabase + mot de passe

---

## 🛠️ Développement local

```bash
cd /Users/reouvenbenchetrit/Downloads/maison-israel-next
source ~/.nvm/nvm.sh
npm run dev
# → http://localhost:3000
```
