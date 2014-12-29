wolas:alerts
==============

Meteor smart package for displaying bootstrap alerts to user based on "Discover Meteor" errors approach but with multiple containers and configurable css classes. 

Demo app: [TBA]

## Install

Simply use this command:

```
$ meteor add wolas:alerts
```

## Usage

No configuration necessary for success, error, info and warning messages. Default behaviour is to not stack alerts when adding new one, and clear already seen messages.

You can add global container as such:

```
{{> alerts}}
```

Or specific container (possible to have multiple containers on one site). 

```
{{> alerts container="loginform"}}
```

Now you can simply throw alerts:

```
Alerts.success("You have successfully logged in") 
```

We have just put success alert into global container or:

```
Alerts.success("You have successfully logged in", "loginform")
```
 
into specific - "loginform" container.

### API

##### Throwing alerts

```
Alerts.throw( message, type, container, reset )
```

Throws alert in sepecific container.

<code>message</code>
*String: Message to be thrown* 

<code>type</code>
*String: Type of the alert. If not specified is error. Supported types: success, info, warning, error*

<code>container</code>
*String: Name of the container. Falsy value if global container*  

<code>reset</code>
*Boolean: If specified, ovverides default reset behaviour*  

##### Throwing success/info/warning/error alerts

```
Alerts.success( message, container )
Alerts.error( message, container )
Alerts.info( message, container )
Alerts.warning( message, container )
```

Shortcut for throwing success alert with default reset behaviour.

<code>message</code>
*String: Message to be thrown* 

<code>container</code>
*String: Name of the container. Falsy value if global container*  


##### Clearing alerts

```
Alerts.clear( container )
```

Clears already seen messages in sepecific container.

<code>container</code>
*String: Name of the container. No parameter if global container* 


## Configuration

You can configure default reset behaviour, if you wish stack all alerts while putting new ones. You can also add new types of alerts (by specifing css class of that type). To do that use:

```
Alerts.configure( options )
```

<code>options</code>
*Object: Options object with overriding settings* 

Default options object (when this method is not run these are applied settings):

```
{
	reset: true,
	css: {
		alert: "alert-danger",
		warning: "alert-warning",
		error: "alert-error",
		info: "alert-info"
	}
}
```


## Notes

Please submit pull requests for better features and cooperation!