import { useActionState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import type { Job } from "../types/type";

type ActionState = { error: string | null };
const initialState: ActionState = { error: null };

const EditJobPage = ({
  updateJobSubmit,
}: {
  updateJobSubmit: (job: Job) => void;
}) => {
  const navigate = useNavigate();
  const job = useLoaderData() as Job;

  const submitForm = async (
    _prev: ActionState,
    payload: FormData
  ): Promise<ActionState> => {
    try {
      const updatedJob: Job = {
        title: payload.get("title") as string,
        type: payload.get("type") as string,
        location: payload.get("location") as string,
        description: payload.get("description") as string,
        salary: payload.get("salary") as string,
        company: {
          name: payload.get("companyName") as string,
          description: payload.get("companyDescription") as string,
          contactEmail: payload.get("contactEmail") as string,
          contactPhone: payload.get("contactPhone") as string,
        },
      };

      updateJobSubmit(updatedJob);

      toast.success("Job Updated successfully");

      navigate(`/jobs/${job.id}`);

      return { error: null };
    } catch (err) {
      toast.error("Failed to add job");
      return { error: (err as Error).message };
    }
  };

  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    submitForm,
    initialState
  );

  return (
    <section className="bg-indigo-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form action={formAction}>
            <h2 className="text-3xl text-center font-semibold mb-6">
              Edit Job
            </h2>

            <div className="mb-4">
              <label
                htmlFor="type"
                className="block text-gray-700 font-bold mb-2"
              >
                Job Type
              </label>
              <select
                id="type"
                name="type"
                className="border rounded w-full py-2 px-3"
                required
                defaultValue={job.type}
              >
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Remote">Remote</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Job Listing Name
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="eg. Beautiful Apartment In Miami"
                required
                defaultValue={job.title}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 font-bold mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                className="border rounded w-full py-2 px-3"
                rows={4}
                placeholder="Add any job duties, expectations, requirements, etc"
                defaultValue={job.description}
              ></textarea>
            </div>

            <div className="mb-4">
              <label
                htmlFor="type"
                className="block text-gray-700 font-bold mb-2"
              >
                Salary
              </label>
              <select
                id="salary"
                name="salary"
                className="border rounded w-full py-2 px-3"
                required
                defaultValue={job.salary}
              >
                <option value="Under $50K">Under $50K</option>
                <option value="$50K - 60K">$50K - $60K</option>
                <option value="$60K - 70K">$60K - $70K</option>
                <option value="$70K - 80K">$70K - $80K</option>
                <option value="$80K - 90K">$80K - $90K</option>
                <option value="$90K - 100K">$90K - $100K</option>
                <option value="$100K - 125K">$100K - $125K</option>
                <option value="$125K - 150K">$125K - $150K</option>
                <option value="$150K - 175K">$150K - $175K</option>
                <option value="$175K - 200K">$175K - $200K</option>
                <option value="Over $200K">Over $200K</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="Company Location"
                required
                defaultValue={job.location}
              />
            </div>

            <h3 className="text-2xl mb-5">Company Info</h3>

            <div className="mb-4">
              <label
                htmlFor="companyName"
                className="block text-gray-700 font-bold mb-2"
              >
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                className="border rounded w-full py-2 px-3"
                placeholder="Company Name"
                defaultValue={job.company.name}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="companyDescription"
                className="block text-gray-700 font-bold mb-2"
              >
                Company Description
              </label>
              <textarea
                id="companyDescription"
                name="companyDescription"
                className="border rounded w-full py-2 px-3"
                rows={4}
                placeholder="What does your company do?"
                defaultValue={job.company.description}
              ></textarea>
            </div>

            <div className="mb-4">
              <label
                htmlFor="contactEmail"
                className="block text-gray-700 font-bold mb-2"
              >
                Contact Email
              </label>
              <input
                type="email"
                id="contactEmail"
                name="contactEmail"
                className="border rounded w-full py-2 px-3"
                placeholder="Email address for applicants"
                required
                defaultValue={job.company.contactEmail}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="contactPhone"
                className="block text-gray-700 font-bold mb-2"
              >
                Contact Phone
              </label>
              <input
                type="tel"
                id="contactPhone"
                name="contactPhone"
                className="border rounded w-full py-2 px-3"
                placeholder="Optional phone for applicants"
                defaultValue={job.company.contactPhone}
              />
            </div>

            <div>
              <button
                disabled={isPending}
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                {isPending ? "Updating…" : "Update Job"}
              </button>
            </div>
            {state.error && (
              <p className="mt-3 text-red-600 text-center">{state.error}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditJobPage;
