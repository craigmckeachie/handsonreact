---
title: Build & Deploy
sidebar_label: Build & Deploy
slug: /build-deploy
---

Deploying a Vite React app as a static site involves building the project and copying the output to the server. Here’s how you can do it step by step:

---

## 1. **Prepare Your Project**

Before deployment, ensure your project is configured correctly:

- Update the `vite.config.js` to include the correct `base` URL if your site will be hosted in a subdirectory.

  ```javascript
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react';

  export default defineConfig({
    plugins: [react()],
    base: '/your-subdirectory/', // Set '/' if deployed at the domain root
  });
  ```

---

## 2. **Build Your Project**

Run the build command:

```bash
npm run build
```

This generates a static version of your app in the `dist/` folder.

---

## 3. **Deploy to a Web Server**

The output in `dist/` can be served by any static web server. Below are some options:

### Static Server for Local Testing

1. Install a simple static server:
   ```bash
   npm install -g serve
   ```
2. Serve the `dist` folder:
   ```bash
   serve -s dist
   ```

---

### GitHub Pages

1. Install the `gh-pages` package:
   ```bash
   npm install gh-pages --save-dev
   ```
2. Add these scripts to `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
3. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```

---

### Netlify

1. Drag and drop the `dist/` folder in Netlify's dashboard for manual deployment, or:
2. Link your repository to Netlify, and specify the build command (`npm run build`) and the publish directory (`dist`).
3. If needed, add redirects in a `_redirects` file for single-page apps:
   ```
   /*    /index.html   200
   ```

---

### Vercel

1. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```
2. Run `vercel` in the project directory and follow the prompts.

---

### Firebase Hosting

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```
2. Initialize Firebase in the project:
   ```bash
   firebase init
   ```
3. Deploy:
   ```bash
   firebase deploy
   ```

---

### Nginx

1. Copy the contents of `dist/` to the root directory served by Nginx (e.g., `/usr/share/nginx/html`).
2. Configure Nginx to serve the files. Example configuration:

   ```nginx
   server {
       listen 80;
       server_name example.com;

       root /usr/share/nginx/html;
       index index.html;

       location / {
           try_files $uri /index.html;
       }
   }
   ```

---

### Apache

1. Copy the `dist/` folder to your web server directory.
2. Enable mod_rewrite and add `.htaccess` for SPA routing:
   ```apache
   <IfModule mod_rewrite.c>
       RewriteEngine On
       RewriteCond %{REQUEST_FILENAME} !-f
       RewriteCond %{REQUEST_FILENAME} !-d
       RewriteRule . /index.html [L]
   </IfModule>
   ```

---

### Microsoft IIS

To deploy on IIS (Internet Information Services), follow these steps:

1. **Enable Static Content Module**:

   - Open IIS Manager.
   - Go to `Server Roles` or `Feature Delegation` and ensure that **Static Content** is enabled.

2. **Set Up a Site for Your App**:

   - Copy the `dist/` folder to a directory on your server (e.g., `C:\inetpub\wwwroot\my-vite-app`).
   - Add a new site in IIS:
     - Open IIS Manager and right-click **Sites**.
     - Click **Add Website**, name it, and set the `Physical Path` to your app directory.

3. **SPA Routing with web.config**:

   - Add a `web.config` file to the `dist/` folder:
     ```xml
     <configuration>
       <system.webServer>
         <rewrite>
           <rules>
             <rule name="React Routes" stopProcessing="true">
               <match url=".*" />
               <conditions logicalGrouping="MatchAll">
                 <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
                 <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
               </conditions>
               <action type="Rewrite" url="/index.html" />
             </rule>
           </rules>
         </rewrite>
       </system.webServer>
     </configuration>
     ```

4. **Grant Permissions**:

   - Ensure the app pool identity has read access to your site directory.

5. **Access Your App**:
   - Navigate to the site using your configured URL or IP address.

---

### Amazon S3 and CloudFront

1. **Upload the `dist/` folder to S3**:

   - In the AWS Management Console, go to your S3 bucket and upload the contents of the `dist/` folder.
   - Ensure the `index.html` file is included.

2. **Enable Static Website Hosting**:

   - In the S3 bucket settings, enable static website hosting:
     - In the **Properties** tab, choose **Static website hosting**.
     - Specify `index.html` as the index document.
     - Also specify `index.html` as the error document to ensure SPA routing works.

3. **Grant Public Access**:

   - Go to the **Permissions** tab.
   - Under **Bucket Policy**, add a policy to allow public read access:
     ```json
     {
       "Version": "2012-10-17",
       "Statement": [
         {
           "Sid": "PublicReadGetObject",
           "Effect": "Allow",
           "Principal": "*",
           "Action": "s3:GetObject",
           "Resource": "arn:aws:s3:::your-bucket-name/*"
         }
       ]
     }
     ```

4. **SPA Redirect Configuration**:

   - In **Error document**, set the same file as `index.html`.
   - This ensures all paths, including 404 errors, are routed to `index.html`. React Router will then handle client-side routing.

5. **(Optional) Use CloudFront**:

   - Create a CloudFront distribution using the S3 bucket as the origin.
   - In the **Error Pages** tab of the CloudFront distribution, create a rule:

     - **HTTP Error Code**: 403 or 404
     - **Customize Error Response**: Yes
     - **Response Page Path**: `/index.html`
     - **HTTP Response Code**: 200.

   - Update your DNS to point your domain (if using one) to the CloudFront distribution.

---

### Azure Static Web Apps

1. **Create a Static Web App**:

   - Go to the [Azure portal](https://portal.azure.com/).
   - Search for **Static Web Apps** in the search bar.
   - Click **Create** to create a new Static Web App resource.
   - Set the required fields:
     - **Subscription**, **Resource group**, and **Region**.
     - Choose a **Name** for your app.

2. **Deployment Method**:

   - Use a GitHub repository and allow Azure to set up a CI/CD pipeline automatically:

     - Provide your GitHub repository details.
     - Choose a build preset like "React".

   - Alternatively, manually deploy the `dist/` folder:
     - Install Azure CLI:
       ```bash
       npm install -g azure-cli
       ```
     - Login to your Azure account:
       ```bash
       az login
       ```
     - Deploy:
       ```bash
       az storage blob upload-batch --account-name YOUR_STORAGE_ACCOUNT_NAME --destination $web --source dist
       ```

3. **SPA Routing**:

   - Add a `routes.json` file in the root of the `dist` folder:

     ```json
     {
       "routes": [
         {
           "route": "/*",
           "serve": "/index.html",
           "statusCode": 200
         }
       ]
     }
     ```

   - Azure automatically picks up this routing configuration.

---

:::info

## Static File Caching

Each file inside of the `dist` directory will have a unique hash appended to the filename that is generated based on the contents of the file, which allows you to use [aggressive caching techniques](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching#invalidating_and_updating_cached_responses) to avoid the browser re-downloading your assets if the file contents haven't changed. If the contents of a file changes in a subsequent build, the filename hash that is generated will be different.

To deliver the best performance to your users, it's best practice to specify a `Cache-Control` header for `index.html`, as well as the files within `build/static`. This header allows you to control the length of time that the browser as well as CDNs will cache your static assets. If you aren't familiar with what `Cache-Control` does, see [this article](https://jakearchibald.com/2016/caching-best-practices/) for a great introduction.

Using `Cache-Control: max-age=31536000` for your `build/static` assets, and `Cache-Control: no-cache` for everything else is a safe and effective starting point that ensures your user's browser will always check for an updated `index.html` file, and will cache all of the `build/static` files for one year. Note that you can use the one year expiration on `build/static` safely because the file contents hash is embedded into the filename.
:::
