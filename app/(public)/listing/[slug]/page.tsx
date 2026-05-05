import React from "react";

const ListingPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  return <div>ListingPage: {slug}</div>;
};

export default ListingPage;
