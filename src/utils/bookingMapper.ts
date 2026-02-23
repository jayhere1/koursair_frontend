// utils/bookingMapper.ts
import { MemberDetails, BookingCounts } from "@/types/booking";
import { BookingPayload, TravelerApiSchema } from "@/types/booking";

const formatDateForApi = (dateString: string): string => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const mapMemberToApi = (member: MemberDetails, passportUrl: string): TravelerApiSchema => ({
  prefix: member.prefix,
  first_name: member.firstName,
  middle_name: member.middleName || "",
  last_name: member.lastName,
  gender: member.gender === 'male' ? 'Male' : member.gender === 'female' ? 'Female' : 'Other',
  dob: formatDateForApi(member.dateOfBirth),
  nationality: member.nationality,
  passport: passportUrl,
});

export const buildBookingPayload = (
  userData: { name: string; email: string; phone: string },
  counts: BookingCounts,
  membersWithUrls: { member: MemberDetails; url: string }[]
): BookingPayload => {
  
  const primary = membersWithUrls[0];
  const others = membersWithUrls.slice(1);

  return {
    name: userData.name,
    email: userData.email,
    phone_number: userData.phone,
    traveller_details: {
      number_of_adults: counts.adults,
      number_of_children: counts.children,
      primary_traveller: mapMemberToApi(primary.member, primary.url),
      members: others.map((m) => mapMemberToApi(m.member, m.url)),
    },
    payment_plan: {
      id: 732905418293,
      payment_type: "Full",
    },
  };
};