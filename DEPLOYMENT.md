# Deployment Guide

This project has two deploy targets:

- `frontend/` deploys to Vercel.
- `backend/` deploys to PythonAnywhere.

## Backend: PythonAnywhere

Open a Bash console on PythonAnywhere, then run:

```bash
git clone https://github.com/elyme-12/FINALS_HO3_Task_Management_System.git
cd FINALS_HO3_Task_Management_System/backend
mkvirtualenv --python=/usr/bin/python3.13 taskenv
pip install -r requirements.txt
python manage.py migrate
```

If the repo already exists on PythonAnywhere, update it with:

```bash
cd ~/FINALS_HO3_Task_Management_System
git pull
cd backend
pip install -r requirements.txt
python manage.py migrate
```

In the PythonAnywhere Web tab:

- Create a new web app using Manual configuration.
- Use the same Python version as the virtualenv.
- Set virtualenv path to `/home/elyshi/.virtualenvs/taskenv`.
- Set source code to `/home/elyshi/FINALS_HO3_Task_Management_System/backend`.
- Set working directory to `/home/elyshi/FINALS_HO3_Task_Management_System/backend`.

Replace the WSGI file with:

```python
import os
import sys

path = '/home/elyshi/FINALS_HO3_Task_Management_System/backend'
if path not in sys.path:
    sys.path.insert(0, path)

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
```

Reload the web app, then test:

```text
https://elyshi.pythonanywhere.com/api/tasks/
```

## Frontend: Vercel

Import this GitHub repository in Vercel.

Use these settings:

- Root Directory: `frontend`
- Framework Preset: `Vite`
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: `dist`

Add this environment variable in Vercel:

```text
VITE_API_URL=https://elyshi.pythonanywhere.com/api
```

After Vercel gives you the production URL, add it to `CORS_ALLOWED_ORIGINS` in `backend/backend/settings.py` if it is different from the existing URL.
