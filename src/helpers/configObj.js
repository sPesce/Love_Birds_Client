const configObj = (method,authenticate,data) =>
{
  const cfg =
  {
    method,
    headers:
    {
      "Content-Type": 'application/json',
      "accept": 'application/json'
    }
  };
  data && (cfg.body = JSON.stringify(data))
  authenticate && (cfg.headers.Authorization = `Bearer ${localStorage.token}`)
  return cfg
}

export default configObj;