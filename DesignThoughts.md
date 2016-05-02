# what would I like to have and how would i like to use it?

two different services, one for detecting site changes but then also one to push changes to another
service, like the apatoserve.

## detector service
should have a list of urls to check and detect changes in them.
should it make these changes public? say through a rest API?
maybe use something similar to event sourcing?

```
[
  {
    "event": "site_scraped"
    "timestamp": "212312312"
    "data": {
      "url": "http://"
    }
  },
  {
    "event": "state_stored",
    "timestamp": "",
    "data": {
      "url": "http://...",
      "entry_name": "google",
      "data": "text...<div etc>"
    }
  }
]
```

```
GET /users/<token>/events/?from-time=
GET /users/<token>/events/<type>/?from-time=
GET /users/<token>/events/<type>/?from-id=
```

## detector interface
instead of having to constantly add all configuration by checking in the yaml document
it would be rather nice if people could be allowed to add their own config by a web interface.

just a simple thing to build the model really

```
POST /settings/ : 200 Created user token
POST /settings/<user-token>/sites/
```

## mailer service
gets events from server and sends emails. ought to have its own API

```
GET detector.com/users/<token>/settings/email
```


# So what's the purpose?
The idea is, I suppose, that if these services are all discreet units, changing them independently
or reusing them for various things will be neat. however.. I don't really want to host them separately. Could I build one docker container that hosts all three things and keep it as a RUN command? that could be neat.. same thing with running the tests. however, that also means I have
to deploy it using a docker, I can't simply run it in heroku just as one single service? unless
I build a single site deploy project that pulls everything down and runs it as a single service,
that could be a little cool of course.

## Docker deploy
Create a dockerfile which runs a docker machine with everything I need installed and just runs it.

## Heroku/open source deploy
Build a project which basically just downloads the packages independently and connects them as
dependencies rather than services and links in past the run commands of each separate package.
