`project.json`:

```json
//...
"my-app": {
    "targets": {
        //...
        "serve": {
            "executor": "@nrwl/vite:dev-server",
            "defaultConfiguration": "development",
            "options": {
                "buildTarget": "my-app:build",
            },
            "configurations": {
                ...
            }
        },
    }
}
```

```bash
nx serve my-app
```

## Examples

{% tabs %}
{% tab label="Set up a custom port" %}

You can always set the port in your `vite.config.ts` file. However, you can also set it directly in your `project.json` file, in the `serve` target options:

```json
//...
"my-app": {
    "targets": {
        //...
        "serve": {
            "executor": "@nrwl/vite:dev-server",
            "defaultConfiguration": "development",
            "options": {
                "buildTarget": "my-app:build",
                "port": 4200,
            },
            "configurations": {
                ...
            }
        },
    }
}
```

{% /tab %}
{% tab label="Set a custom path for vite.config.ts" %}

Nx will automatically look in the root of your application for a `vite.config.ts` (or a `vite.config.js`) file. If you want to use a different path, you can set it in your `project.json` file, in the `serve` target options:

```json
//...
"my-app": {
    "targets": {
        //...
        "serve": {
            "executor": "@nrwl/vite:dev-server",
            "defaultConfiguration": "development",
            "options": {
                "buildTarget": "my-app:build",
                "configFile": "apps/my-app/vite.config.other-path.ts"
            },
            "configurations": {
                ...
            }
        },
    }
}
```

or even

```json
//...
"my-app": {
    "targets": {
        //...
        "serve": {
            "executor": "@nrwl/vite:dev-server",
            "defaultConfiguration": "development",
            "options": {
                "buildTarget": "my-app:build",
                "configFile": "vite.config.base.ts"
            },
            "configurations": {
                ...
            }
        },
    }
}
```

{% /tab %}

{% tab label="Specify a proxyConfig" %}

You can specify a proxy config by pointing to the path of your proxy configuration file:

```json
//...
"my-app": {
    "targets": {
        //...
        "serve": {
            "executor": "@nrwl/vite:dev-server",
            "defaultConfiguration": "development",
            "options": {
                "buildTarget": "my-app:build",
                "proxyConfig": "apps/my-app/proxy.conf.json"
            },
            "configurations": {
                ...
            }
        },
    }
}
```

{% /tab %}

{% /tabs %}
