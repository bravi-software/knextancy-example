export default function (data, url) {
  if (Array.isArray(data)) {
    return list(data, url);
  }

  return detail(data, url);
}


function list (profiles, url) {
  return {
    list: profiles.map(detail),
    _links: {
      self: {
        href: url,
      },
    },
  };
}


function detail (data, url) {
  const profile = { ...data };
  delete profile.deleted;

  profile._links = {
    self: {
      href: url || `/${profile.id}`,
    },
  };

  return profile;
}
