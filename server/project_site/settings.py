"""
Django settings for project_site project.

Generated by 'django-admin startproject' using Django 1.11.6.

For more information on this file, see
https://docs.djangoproject.com/en/1.11/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.11/ref/settings/
"""

import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


"""
CREATE DATABASE djbr CHARACTER SET utf8 COLLATE utf8_general_ci;


CREATE USER 'panos'@'localhost' IDENTIFIED BY '1234';


GRANT ALL PRIVILEGES ON djbr.* TO 'panos'@'localhost';

GRANT ALL PRIVILEGES ON djbr.* TO 'panos'@'localhost' IDENTIFIED BY 'Panagiotis123' WITH GRANT OPTION;
FLUSH PRIVILEGES;"""
# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.11/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '*n+)s2a1(@h!n6gyv(!2bm5uf70*#f-w(s)&szcm64$$b#e5g2'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['localhost', '127.0.0.1', '[::1]', 'snf-862020.vm.okeanos.grnet.gr']

# Application definition

INSTALLED_APPS = [
    'rest_framework',
    'djbr.apps.DjbrConfig',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    #'authentication',
    'django.contrib.sites',
    'corsheaders',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',

    'rest_auth.registration',
    'rest_framework.authtoken',
]

SITE_ID = 1

STATIC_URL = '/static/'

STATIC_ROOT = os.path.join(BASE_DIR, "static/")

STATICFILES_DIRS = (os.path.join(BASE_DIR, 'staticfiles'),)

MEDIA_ROOT = os.path.join(BASE_DIR, "media")

MEDIA_URL = "/media/"

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',

    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',

    'django.middleware.common.CommonMiddleware',
    'corsheaders.middleware.CorsMiddleware',

]
import datetime
JWT_AUTH = {
    'JWT_EXPIRATION_DELTA': datetime.timedelta(seconds=90000),
    'JWT_ALLOW_REFRESH': True,
    'JWT_REFRESH_EXPIRATION_DELTA': datetime.timedelta(days=60),
}

CORS_ORIGIN_ALLOW_ALL = True


REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
        'rest_framework_jwt.authentication.JSONWebTokenAuthentication',
        'rest_framework_simplejwt.authentication.JWTAuthentication'),
}

ROOT_URLCONF = 'project_site.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'project_site.wsgi.application'

# Database
# https://docs.djangoproject.com/en/1.11/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}


# Password validation
# https://docs.djangoproject.com/en/1.11/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/1.11/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'EET'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.11/howto/static-files/

STATIC_URL = '/static/'

from pathlib import Path
STATICFILES_DIRS = (
    os.path.join(str(Path(BASE_DIR).parents[0]), os.path.join('client', 'dist')),
)

STATIC_ROOT = os.path.join(BASE_DIR, 'dist')

try:
    from .site_config import *
except ImportError as ex:
    print(ex)
    pass

#AUTH_USER_MODEL = 'authentication.Account'
