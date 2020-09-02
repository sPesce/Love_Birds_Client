export default (validated,complete) =>
{
  const issues = []
  
    if(!complete)
      issues.push("Account is not complete, finish filling out account details to get verified.")
    else if (!validated)
      issues.push("Account is waiting verification. Verification is done manually, please give us 24 hours after account is complete.")
    
    return issues;   
}