import { useActionState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import type { Job } from "../types/type";

type ActionState = { error: string | null };
const initialState: ActionState = { error: null };

const AddJobPage = ({ addJobSubmit }: { addJobSubmit: (job: Job) => void }) => {
  const navigate = useNavigate();

  /* ---------- form action ---------- */
  const addJobAction = async (
    _prev: ActionState,
    payload: FormData
  ): Promise<ActionState> => {
    try {
      const newJob: Job = {
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

      addJobSubmit(newJob);

      toast.success("Job added successfully");
      navigate("/jobs");

      return { error: null };
    } catch (err) {
      toast.error("Failed to add job");
      return { error: (err as Error).message };
    }
  };

  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    addJobAction,
    initialState
  );

  /* ---------- UI ---------- */
  return (
    <section className="bg-indigo-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form action={formAction}>
            <h2 className="text-3xl text-center font-semibold mb-6">Add Job</h2>

            {/* Job Type */}
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
                required
                className="border rounded w-full py-2 px-3"
                defaultValue="Full-Time"
              >
                <option>Full-Time</option>
                <option>Part-Time</option>
                <option>Remote</option>
                <option>Internship</option>
              </select>
            </div>

            {/* Job Title */}
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-gray-700 font-bold mb-2"
              >
                Job Listing Name
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="e.g. Senior Backend Engineer"
              />
            </div>

            {/* Description */}
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
                rows={4}
                className="border rounded w-full py-2 px-3"
                placeholder="Add any job duties, expectations, requirements, etc."
              />
            </div>

            {/* Salary */}
            <div className="mb-4">
              <label
                htmlFor="salary"
                className="block text-gray-700 font-bold mb-2"
              >
                Salary
              </label>
              <select
                id="salary"
                name="salary"
                required
                className="border rounded w-full py-2 px-3"
                defaultValue="Under $50K"
              >
                <option>Under $50K</option>
                <option>$50K - 60K</option>
                <option>$60K - 70K</option>
                <option>$70K - 80K</option>
                <option>$80K - 90K</option>
                <option>$90K - 100K</option>
                <option>$100K - 125K</option>
                <option>$125K - 150K</option>
                <option>$150K - 175K</option>
                <option>$175K - 200K</option>
                <option>Over $200K</option>
              </select>
            </div>

            {/* Location */}
            <div className="mb-4">
              <label
                htmlFor="location"
                className="block text-gray-700 font-bold mb-2"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                required
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="Company location"
              />
            </div>

            <h3 className="text-2xl mb-5">Company Info</h3>

            {/* Company Name */}
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
                placeholder="Company name"
              />
            </div>

            {/* Company Description */}
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
                rows={4}
                className="border rounded w-full py-2 px-3"
                placeholder="What does your company do?"
              />
            </div>

            {/* Contact Email */}
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
                required
                className="border rounded w-full py-2 px-3"
                placeholder="Email address for applicants"
              />
            </div>

            {/* Contact Phone */}
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
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="bg-indigo-500 hover:bg-indigo-600 disabled:opacity-60 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
            >
              {isPending ? "Adding…" : "Add Job"}
            </button>

            {state.error && (
              <p className="mt-3 text-red-600 text-center">{state.error}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddJobPage;
