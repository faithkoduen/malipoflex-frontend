const baseUrl = '/api/users';

export async function fetchUsers() {
  try {
    const response = await fetch(baseUrl); 
    if (!response.ok) {
      throw new Error('Something went wrong: ' + response.statusText);
    }
    const result = await response.json();
    return result;
  } catch (error: any) {
    throw new Error('Failed to fetch users: ' + error.message);
  }
}


export interface Member {
  member_id?: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  password?: string;
  user_type: string;
  national_id?: string;
  kra_pin?: string;
  email?: string;
  next_of_kin_name?: string;
  next_of_kin_id?: string;
  date?: string;
  status?: string;
}

interface ApiMember {
  id?: number; 
  member_id?: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  password?: string;
  user_type: string;
  national_id?: string;
  kra_pin?: string;
  email?: string;
  next_of_kin_name?: string;
  next_of_kin_id?: string;
  date?: string;
  status?: string;
}

export async function getMembers(): Promise<Member[]> {
  const fullUrl = `${baseUrl}`;
  try {
    console.log("Fetching from:", fullUrl);
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const result = await response.json();
    
    // Handle both array and { data: [...] } responses
    let membersData: ApiMember[] = Array.isArray(result) ? result : (result.data || result.results || []);

    return membersData.map(member => ({
      member_id: member.member_id || member.id, // handle 'id' vs 'member_id'
      first_name: member.first_name,
      last_name: member.last_name,
      phone_number: member.phone_number,
      password: member.password || "",
      user_type: member.user_type,
      national_id: member.national_id,
      kra_pin: member.kra_pin,
      email: member.email,
      next_of_kin_name: member.next_of_kin_name,
      next_of_kin_id: member.next_of_kin_id,
      date: member.date || new Date().toISOString().split("T")[0],
      status: member.status || "PENDING",
    }));
  } catch (error) {
    console.error("Fetch members error:", error);
    throw new Error(`Failed to fetch members: ${(error as Error).message}`);
  }
}

export async function createMember(member: Member): Promise<Member> {
  const fullUrl = `${baseUrl}`;
  const payload = {
    first_name: member.first_name,
    last_name: member.last_name,
    phone_number: member.phone_number,
    password: member.password || "default123",
    user_type: member.user_type,
    national_id: member.national_id,
    kra_pin: member.kra_pin,
    email: member.email,
    next_of_kin_name: member.next_of_kin_name,
    next_of_kin_id: member.next_of_kin_id,
  };

  try {
    console.log("POST to:", fullUrl, "with:", payload);
    const response = await fetch(fullUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const created = await response.json();
    return {
      member_id: created.member_id || created.id,
      first_name: created.first_name,
      last_name: created.last_name,
      phone_number: created.phone_number,
      password: created.password || "",
      user_type: created.user_type,
      national_id: created.national_id,
      kra_pin: created.kra_pin,
      email: created.email,
      next_of_kin_name: created.next_of_kin_name,
      next_of_kin_id: created.next_of_kin_id,
      date: created.date || new Date().toISOString().split("T")[0],
      status: created.status || "PENDING",
    };
  } catch (error) {
    console.error("Create member error:", error);
    throw new Error(`Failed to create member: ${(error as Error).message}`);
  }
}
